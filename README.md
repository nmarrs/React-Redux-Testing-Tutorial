# React-Redux-Testing-Tutorial

A brief tutorial on how to test React + Redux code using Jest + Enzyme.

Refer to [here](https://github.com/nmarrs/replenisher-task-app/blob/master/README.md) for a guide to the sample application we will be writing a few tests for.

## Table of Contents

- [Getting Started](#getting-started)
  - [Get Running Locally](#run-project-locally)
- [Basic React Testing](#basic-react-testing)
  - [What to Test?](#what-to-test)
  - [Let's write some tests!](#lets-write-some-tests)
- [Basic Redux Testing](#basic-redux-testing)
  - [Testing Redux Actions](#testing-redux-actions)
  - [Testing Redux Reducers](#testing-redux-reducers)
- [Resources](#resources)

## Getting Started

Welcome to the brief tutorial on learning how to test React + Redux code!

### Run Project Locally

First clone the git repo. Navigate to the desired location and then:
`git clone https://github.com/nmarrs/React-Redux-Testing-Tutorial.git`

Next change directory into the new project.
`cd React-Redux-Testing-Tutorial`

Run the following scripts in the terminal:
`yarn install`
`yarn start`

Now open another terminal tab using `Cmd + t`. Run the following script:
`yarn test`

You now should have the application running locally and the test suite running! Great job!

## Basic React Testing

Our project actually has a ton of tests already written for it. Today we will be adding the missing tests for the CreateTaskForm.js component!

A quick introduction to the tools we will be using.

[Jest](https://jestjs.io/) is a zero configuration testing platform used by Facebook to test all JavaScript code including React applications.

[Enzyme](https://airbnb.io/enzyme/) is a JavaScript testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

Now that we have introduced the tools lets start writing code! We will first look at how to test a relatively basic React component.

Before we start writing code, let's review some general guidelines for what's worth testing in a React component.

### What to Test?

**It must render**
At the very least, make sure the component renders without error. This verifies there are no JSX syntax errors, that all variables are defined, etc. This could be as simple as verifying that the rendered output is not null.

**Test the output**
One step above “it renders” is “it renders the correct thing.” Given a set of props, what output is expected? Does `Person` render its name and age, or does it render a name and “TODO: age coming in v2.1”?

**Test the states**
Every conditional should be accounted for. If the classNames are conditional (enabled/disabled, success/warning/error, etc), make sure to test that the className-deciding logic is working right. Likewise for conditionally-rendered children: if a `Logout` button is only visible when the user is logged in, for instance, make sure to test for that.

**Test the events**
If the component can be interacted with (an `input` or `button` with an `onClick` or `onChange` or `onAnything`), test that the events work as expected and call the specified functions with the correct arguments (including binding `this`, if it matters).

**Test the edge cases**
Anything that operates on an array could have boundary cases — an empty array, an array with 1 element, a paginated list that should truncate at 25 items, and so on. Try out every edge case you can think of, and make sure they all work correctly.

### Let's Write Some Tests!

The first thing to do is to add our testing file. Let's add a `CreateTaskForm.test.js` file at the `src/components/__tests__` directory. We also want to make sure we are running the `yarn test` script in our terminal. The Jest test script should automatically only run the tests for files you've changed.

The first thing to add to this file is the imports of Jest and Enzyme.

```
import React from "react";
import { shallow } from "enzyme";

import CreateTaskForm from ".././CreateTaskForm";
```

Notice that we are importing the module `shallow` from Enzyme. This module allows us to shallowly render a React component, stubbing out any children components... handy!

Next we need to do some set up of the test file. In Jest testing we use the `describe` function to define a block of tests and the `it` function to define a single test. The basic setup of a test file will look like this.

```
describe("CreateTaskForm", () => {

});
```

At this point our `CreateTaskForm.test.js` file should look like this:

```
import React from "react";
import { shallow } from "enzyme";

import CreateTaskForm from ".././CreateTaskForm";

describe("CreateTaskForm", () => {

});
```

The next step is finish setting up our test file. Jest has helpful functions `beforeEach()` and `afterEach()` where you can place setup and cleanup code for your tests. We will be using Enzyme to shallowly render our `CreateTaskForm` component. When we use enzyme we assign the result to a variable, usually called a `wrapper`, as the object wraps a shallow render of our component. We use this `wrapper` to assert / perform our user tests. Since we will be using the `wrapper` object throughout the entire test file, it is generally best to declare it at the top of our file. Add the following code inside your `describe()` enclosure.

```
let wrapper;
let createTask = jest.fn();
let toggleCreateTaskModal = jest.fn();

beforeEach(() => {
  wrapper = shallow(
    <CreateTaskForm
      createTask={createTask}
      toggleCreateTaskModal={toggleCreateTaskModal}
      isAdminView={true}
    />
  );
});

afterEach(() => {
  jest.clearAllMocks();
});
```

In the code above we can see that we are utilizing the setup / cleanup methods provided by Jest. `jest.fn()` is how you can make a mock object in Jest. In our `beforeEach()` setup function we are creating a fresh wrapper object, passing in the React component and props. We have mocked the functions we are passing in for testing purposes that will be explained later on.

In our `afterEach()` cleanup function we are calling `jest.clearAllMocks()` which is a helper function that clears all existing mocks, ensuring that objects that we don't want mocked after a test are restored to their original state before moving on to the next test.

Ok awesome, if you've been following along so far this is what your file should look like:

```
import React from "react";
import { shallow } from "enzyme";

import CreateTaskForm from ".././CreateTaskForm";

describe("CreateTaskForm", () => {
  let wrapper;
  let createTask = jest.fn();
  let toggleCreateTaskModal = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CreateTaskForm
        createTask={createTask}
        toggleCreateTaskModal={toggleCreateTaskModal}
        isAdminView={true}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
```

Now let's actually write some tests!

**It must render**
First, we want to make sure our component renders. Add the following test after your `afterEach()` function.

```
it("should exist", () => {
  expect(wrapper).toBeDefined();
});
```

Once again, we define an individual unit test in Jest via the `it()` function. This test very simply takes in the wrapper object we created via the `beforeEach()` setup function and makes sure it is a defined object. The `expect()` method

**Test the output**
Easy! Now let's move onto testing the output of the component. This is actually easy as well!

```
it("renders correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
```

You noticed that we are calling `.toMatchSnapshot()` method to verify our component's output. Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.

A typical snapshot test case for an app renders a UI component, takes a screenshot, then compares it to a reference image stored alongside the test. The test will fail if the two images do not match: either the change is unexpected, or the screenshot needs to be updated to the new version of the UI component. To learn more about snapshots, see [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)

**Test the states**
To test the state of our component we will rely on snapshot testing again.

```
it("initially should have expected state", () => {
  expect(wrapper.state()).toMatchSnapshot();
});
```

Notice we can access our component's state by calling `wrapper.state()`. That's pretty neat!

**Test the events**
Our component has multiple events handling the form input change. Whenever we have a group of similarly related unit tests we can wrap them into a `describe()` block!

We will be adding one example test for the handling the title input change and a few tests for handling submitting our form.
Add the following code underneath our unit test for state:

```
describe("handlers", () => {
  it("handleTitleInputChange", () => {
    let testEvent = {
      target: {
        value: "New Title"
      }
    };

    wrapper.instance().handleTitleInputChange(testEvent);

    expect(wrapper.state().title).toEqual("New Title");
  });
});
```

You can see here we are creating a test event object, with a `target.value` of `"New Title"`. Then, in order to invoke the method we are testing for our component we can do `wrapper.instance().methodToTestHere(parameters)`. After that point we can confirm whether or not the event did the action we expected. In this case, it should of set the component's `title` state property to the value of `"New Title"`.

Moving on we will be adding a more complex test, testing the `handleSubmit` event. Add the following block of code underneath the `handleTitleInputChange` test.

```
describe("handleSubmit", () => {
  it("valid data", () => {
    let testEvent = {
      preventDefault: jest.fn()
    };
    wrapper
      .instance()
      .setState({ title: "Test Title", priority: "3", timeEstimate: "2" });

    wrapper.instance().handleSubmit(testEvent);

    expect(createTask).toHaveBeenCalled();
    expect(toggleCreateTaskModal).toHaveBeenCalled();
    expect(toggleCreateTaskModal).toHaveBeenCalledWith(false);
  });

  it("invalid data", () => {
    global.window.alert = jest.fn();
    let testEvent = {
      preventDefault: jest.fn()
    };

    wrapper.instance().handleSubmit(testEvent);

    expect(global.window.alert).toHaveBeenCalled();
    expect(global.window.alert).toHaveBeenCalledWith(
      "Error, task must have a valid title, time estimate, and priority level."
    );
  });
});
```

Ok... so there's a lot more going on here. First of all we have broken off into another `describe()` block. It is totally cool to have nested `describe()` blocks!. We then have two unit tests, first testing the success case, and then the case in which there is invalid data.

First, let's look at the valid test. We are setting up a testEvent as well as setting the wrapper's state to the values that we need. We then call the `handleSubmit()` method via the `wrapper.instance()`. Finally we check our mocked functions passed in as props. Remember how we declared the `createTask` and `toggleCreateTaskModal` prop functions as `jest.fn()`? (coming full circle from the beginning!) The `toHaveBeenCalled()` function checks to make sure the mocked function has been invoked. The `toHaveBeenCalledWith()` function lets you verify what parameters the mocked function was called with. Hey, that's pretty neat!

Next, let's look at the invalid data test. Here we setting up our `testEvent` as well as mocking out the global `window.alert` function (as that is what is called when our `handleSubmit()` event has invalid data). We then invoke the `wrapper.instance()` `handleSubmit()` function. We then test our mocked `alert` function to see if was called, and if it was called with the correct parameter.

Awesome! Great job guys. At this point your file should look like this (I've included the missing form input change tests, for an extra challenge try implementing those on your own!):

```
import React from "react";
import { shallow } from "enzyme";

import CreateTaskForm from ".././CreateTaskForm";

describe("CreateTaskForm", () => {
  let wrapper;
  let createTask = jest.fn();
  let toggleCreateTaskModal = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CreateTaskForm
        createTask={createTask}
        toggleCreateTaskModal={toggleCreateTaskModal}
        isAdminView={true}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("initially should have expected state", () => {
    expect(wrapper.state()).toMatchSnapshot();
  });

  describe("handlers", () => {
    it("handleTitleInputChange", () => {
      let testEvent = {
        target: {
          value: "New Title"
        }
      };

      wrapper.instance().handleTitleInputChange(testEvent);

      expect(wrapper.state().title).toEqual("New Title");
    });

    it("handleStatusSelectChange", () => {
      let testEvent = {
        target: {
          value: "In Progress"
        }
      };

      wrapper.instance().handleStatusSelectChange(testEvent);

      expect(wrapper.state().currentStatus).toEqual("In Progress");
    });

    it("handleTimeEstimateInputChange", () => {
      let testEvent = {
        target: {
          value: "6"
        }
      };

      wrapper.instance().handleTimeEstimateInputChange(testEvent);

      expect(wrapper.state().timeEstimate).toEqual("6");
    });

    it("handlePrioritySelectChange", () => {
      let testEvent = {
        target: {
          value: "3"
        }
      };

      wrapper.instance().handlePrioritySelectChange(testEvent);

      expect(wrapper.state().priority).toEqual("3");
    });

    it("handleFeedbackInputChange", () => {
      let testEvent = {
        target: {
          value: "Test Notes"
        }
      };

      wrapper.instance().handleNotesInputChange(testEvent);

      expect(wrapper.state().notes).toEqual("Test Notes");
    });

    it("handleFeedbackInputChange", () => {
      let testEvent = {
        target: {
          value: "Test Feedback"
        }
      };

      wrapper.instance().handleFeedbackInputChange(testEvent);

      expect(wrapper.state().feedback).toEqual("Test Feedback");
    });

    describe("handleSubmit", () => {
      it("valid data", () => {
        let testEvent = {
          preventDefault: jest.fn()
        };
        wrapper
          .instance()
          .setState({ title: "Test Title", priority: "3", timeEstimate: "2" });

        wrapper.instance().handleSubmit(testEvent);

        expect(createTask).toHaveBeenCalled();
        expect(toggleCreateTaskModal).toHaveBeenCalled();
        expect(toggleCreateTaskModal).toHaveBeenCalledWith(false);
      });

      it("invalid data", () => {
        global.window.alert = jest.fn();
        let testEvent = {
          preventDefault: jest.fn()
        };

        wrapper.instance().handleSubmit(testEvent);

        expect(global.window.alert).toHaveBeenCalled();
        expect(global.window.alert).toHaveBeenCalledWith(
          "Error, task must have a valid title, time estimate, and priority level."
        );
      });
    });
  });
});
```

This wraps up the basic React testing part of the tutorial. Now onto Redux!

## Basic React Testing

Ok so this will be super brief. Basically you want to test both Redux reducers and actions. It is general best practice not to worry about doing integration testing with React + Redux as the libraries themselves handle that effectively.

### Testing Redux Actions

Open up the `actions.test.js` file found in the `src/__tests__` directory. Here you will find a good deal of tests already written. We will be adding a test for the `toggleCreateTaskModal` action. You can add this test to the top of the file underneath the `afterEach()` function.

```
describe("toggleCreateTaskModal", () => {
  it("dispatches the correct action and payload", () => {
    const showCreateTaskModal = true;

    store.dispatch(actions.toggleCreateTaskModal(showCreateTaskModal));
    expect(store.getActions()).toMatchSnapshot();
  });
});
```

We can see here that there are some differences from testing React components. First of all we are not using Enzyme. Instead we are using a library called `redux-mock-store`. This allows us to have a test Redux store to use for our action unit tests. The setup of this can seen at the top of the file:

```
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

beforeEach(() => {
  store.clearActions();
});
```

In our `beforeEach()` setup method we are clearing any existing actions in the Redux store.

As for our actual test, all we do is create our desired payload, in this case a boolean value. We then `dispatch()` our desired action and payload to the test Redux store. Finally, we use `expect()` to ensure that the store's current actions are what we expect using snapshot testing.

### Testing Redux Reducers

Open up the `reducer.test.js` file found in the `src/__tests__` directory. Here you will find a good deal of tests already written. We will be adding a test for the `TOGGLE_EDIT_TASK_MODAL` reducer. You can add this test to the top of the file underneath the `INITIAL_STATE` test.

```
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
```

Here we can wee that we are setting up our action that is being sent to interact with our `rootReducer`. We then use `expect()` to verify the state returned by the reducer is what we expect given the provided action. In this case, that the `showCreateTaskModal` state property now has the value of `true`.

That is all. Great job getting through this tutorial!

## Resources

- [Jest](https://jestjs.io/)
- [Enzyme](https://airbnb.io/enzyme/)
- [Snapshot Testing](https://jestjs.io/docs/en/snapshot-testing)
- [What to test in a react app](https://daveceddia.com/what-to-test-in-react-app/)
- [Comprehensive React/Redux Testing Guide](https://testdriven.io/tdd-with-react-jest-and-enzyme-part-one)
- [Test Driven Development in React](https://daveceddia.com/getting-started-with-tdd-in-react/)
