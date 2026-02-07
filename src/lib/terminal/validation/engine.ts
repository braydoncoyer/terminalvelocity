import { Goal, GoalState, ValidationContext } from "./types";

export function validateGoals(
  goals: GoalState[],
  ctx: ValidationContext
): GoalState[] {
  return goals.map((goalState) => {
    if (goalState.status === "completed") return goalState;

    const passed = checkGoal(goalState.goal, ctx);

    return {
      ...goalState,
      status: passed ? "completed" : "pending",
      attempts: goalState.attempts + 1,
    };
  });
}

function checkGoal(goal: Goal, ctx: ValidationContext): boolean {
  switch (goal.type) {
    case "fs_exists":
      return goal.value ? ctx.fs.exists(goal.value) : false;

    case "fs_is_directory":
      return goal.value ? ctx.fs.isDirectory(goal.value) : false;

    case "cwd_equals": {
      if (!goal.value) return false;
      const resolved = ctx.fs.resolve(goal.value);
      return ctx.cwd === resolved;
    }

    case "fs_content_contains": {
      if (!goal.value) return false;
      const [path, ...searchParts] = goal.value.split(":");
      const search = searchParts.join(":");
      try {
        const content = ctx.fs.readFile(path);
        return content.includes(search);
      } catch {
        return false;
      }
    }

    case "history_contains":
      return goal.value
        ? ctx.history.some((h) => h.includes(goal.value!))
        : false;

    case "command_output_contains":
      if (!goal.value) return false;
      // Case-insensitive match — real terminals are case-sensitive, but
      // validation should be forgiving so users aren't penalised for casing
      return (
        ctx.lastOutput.toLowerCase().includes(goal.value.toLowerCase()) ||
        ctx.lastCommand.toLowerCase().includes(goal.value.toLowerCase())
      );

    case "custom":
      return goal.validate ? goal.validate(ctx) : false;

    default:
      return false;
  }
}

export function allGoalsCompleted(goals: GoalState[]): boolean {
  return goals.every((g) => g.status === "completed");
}

export function createGoalStates(goals: Goal[]): GoalState[] {
  return goals.map((goal) => ({
    goal,
    status: "pending",
    attempts: 0,
  }));
}
