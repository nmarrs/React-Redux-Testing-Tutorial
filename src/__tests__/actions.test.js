import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from ".././actions";
import { testTask, testTask1 } from "../testData";

describe("actions", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore();

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // INSERT TEST FOR `toggleCreateTaskModal` HERE!!

  describe("toggleEditTaskModal", () => {
    it("dispatches the correct action and payload", () => {
      const showEditTaskModal = true;

      store.dispatch(actions.toggleEditTaskModal(showEditTaskModal, testTask));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("toggleIsAdminView", () => {
    it("dispatches the correct action and payload", () => {
      store.dispatch(actions.toggleIsAdminView());
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("assignTasksToUser", () => {
    it("dispatches the correct action and payload", () => {
      global.window.alert = jest.fn();
      let templateTasks = [testTask];

      store.dispatch(actions.assignTasksToUser(templateTasks));
      expect(store.getActions()).toMatchSnapshot();
      expect(global.window.alert).toHaveBeenCalled();
      expect(global.window.alert).toHaveBeenCalledWith(
        "Tasks have been assigned to user!"
      );
    });
  });

  describe("createTask", () => {
    it("dispatches the correct action and payload when admin view", () => {
      let isAdminView = true;

      store.dispatch(actions.createTask(testTask, isAdminView));
      expect(store.getActions()).toMatchSnapshot();
    });

    it("dispatches the correct action and payload when not admin view", () => {
      let isAdminView = false;

      store.dispatch(actions.createTask(testTask, isAdminView));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("editTask", () => {
    it("dispatches the correct action and payload when admin view", () => {
      let isAdminView = true;

      store.dispatch(actions.editTask(testTask, isAdminView));
      expect(store.getActions()).toMatchSnapshot();
    });

    it("dispatches the correct action and payload when not admin view", () => {
      let isAdminView = false;

      store.dispatch(actions.editTask(testTask, isAdminView));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("sortTasksByRank", () => {
    it("dispatches the correct action and payload", () => {
      let templateTasks = [testTask];
      let userTasks = [testTask, testTask1];

      store.dispatch(actions.sortTasksByRank(templateTasks, userTasks));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe("calculateTaskRankWeight", () => {
    it("calculates task rank weight as expected", () => {
      let priority1 = 3;
      let timeEstimate1 = 2;
      let priority2 = 1;
      let timeEstimate2 = 10;

      let taskRankWeight1 = actions.calculateTaskRankWeight(
        priority1,
        timeEstimate1
      );
      let taskRankWeight2 = actions.calculateTaskRankWeight(
        priority2,
        timeEstimate2
      );
      expect(taskRankWeight1).toMatchSnapshot();
      expect(taskRankWeight2).toMatchSnapshot();
      expect(taskRankWeight1).toBeGreaterThan(taskRankWeight2);
    });
  });
});
