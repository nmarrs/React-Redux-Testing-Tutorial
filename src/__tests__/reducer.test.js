import { rootReducer } from ".././index";
import { testTask, testTask2 } from "../testData";

describe("reducer", () => {
  describe("INITIAL_STATE", () => {
    it("is correct", () => {
      const action = { type: "dummy_action" };

      expect(rootReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe("TOGGLE_CREATE_TASK_MODAL", () => {
    it("is correct", () => {
      let showCreateTaskModal = true;
      const action = {
        type: "TOGGLE_CREATE_TASK_MODAL",
        payload: showCreateTaskModal,
        task: testTask
      };

      expect(rootReducer(undefined, action)).toMatchSnapshot();
    });
  });

  // INSERT TEST FOR `TOGGLE_EDIT_TASK_MODAL` HERE!!

  describe("TOGGLE_IS_ADMIN_VIEW", () => {
    it("is correct", () => {
      const action = { type: "TOGGLE_IS_ADMIN_VIEW" };

      expect(rootReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe("ASSIGN_TASKS_TO_USER", () => {
    it("is correct", () => {
      const action = { type: "ASSIGN_TASKS_TO_USER", payload: [testTask] };

      expect(rootReducer(undefined, action)).toMatchSnapshot();
    });
  });

  describe("CREATE_TEMPLATE_TASK", () => {
    it("is correct", () => {
      const action = { type: "CREATE_TEMPLATE_TASK", payload: testTask2 };

      let returnedState = rootReducer(undefined, action);
      expect(returnedState).toMatchSnapshot();
      // Check to ensure sorting works as expected
      expect(returnedState.templateTasks[0].rankWeight).toBe(250);
    });
  });

  describe("CREATE_TASK", () => {
    it("is correct", () => {
      const action = { type: "CREATE_TASK", payload: testTask2 };

      expect(rootReducer(undefined, action)).toMatchSnapshot();
    });

    it("sorts correctly", () => {
      const action1 = { type: "ASSIGN_TASKS_TO_USER", payload: [testTask] };
      const action2 = { type: "CREATE_TASK", payload: testTask2 };

      // First add initial template tasks to user
      let firstState = rootReducer(undefined, action1);

      let nextState = rootReducer(firstState, action2);
      expect(nextState).toMatchSnapshot();
      // Check to ensure sorting works as expected
      expect(nextState.user.tasks[0].rankWeight).toBe(250);
    });
  });

  describe("EDIT_TEMPLATE_TASK", () => {
    it("is correct", () => {
      let changedTask = { ...testTask };
      changedTask.feedback = "Some example feedback.";
      const action = { type: "EDIT_TEMPLATE_TASK", payload: changedTask };

      let returnedState = rootReducer(undefined, action);
      expect(returnedState).toMatchSnapshot();
    });
  });

  describe("EDIT_TASK", () => {
    it("is correct", () => {
      const action1 = { type: "ASSIGN_TASKS_TO_USER", payload: [testTask] };
      let changedTask = { ...testTask };
      changedTask.feedback = "Some example feedback.";
      const action2 = { type: "EDIT_TASK", payload: changedTask };

      // First add initial template tasks to user
      let firstState = rootReducer(undefined, action1);

      let nextState = rootReducer(firstState, action2);
      expect(nextState).toMatchSnapshot();
    });
  });

  describe("SORT_TASKS_BY_RANK", () => {
    it("is correct", () => {
      let templateTasks = [testTask];
      let userTasks = [testTask2];
      const action = {
        type: "SORT_TASKS_BY_RANK",
        sortedTemplateTasks: templateTasks,
        sortedUserTasks: userTasks
      };

      let returnedState = rootReducer(undefined, action);
      expect(returnedState).toMatchSnapshot();
    });
  });
});
