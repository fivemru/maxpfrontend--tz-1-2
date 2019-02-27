# The solution of task #2 from @maxfarseer

**Main tools**: CRA, react, redux, redux-thunk, react-router.

### [Demo link](https://fivemru.github.io/maxpfrontend--tz-1-2/index.html)


## Features

1. React hooks used
1. Unit [testing reducers](https://github.com/fivemru/maxpfrontend--tz-1-2/tree/tz2/src/reducers)
1. Unit [testing actions](https://github.com/fivemru/maxpfrontend--tz-1-2/tree/tz2/src/actions)
2. Handling network errors and API errors are located in the [helper](https://github.com/fivemru/maxpfrontend--tz-1-2/blob/tz2/src/helpers/network.js)
3. Unit [testing network and api errors](https://github.com/fivemru/maxpfrontend--tz-1-2/tree/tz2/src/helpers/network.spec.js)
4. Custom hook [useValidation()](https://github.com/fivemru/maxpfrontend--tz-1-2/blob/tz2/src/helpers/useValidation.js) for validation. Usage [example](https://github.com/fivemru/maxpfrontend--tz-1-2/blob/tz2/src/components/LoginPage/LoginPage.js).
5. Own error type [ResponseError](https://github.com/fivemru/maxpfrontend--tz-1-2/blob/tz2/src/helpers/errors.js) for API error with saving server response
6. Error parser [parseError](https://github.com/fivemru/maxpfrontend--tz-1-2/blob/tz2/src/helpers/errors.js)

## Usage

```
yarn
yarn start
```

**Login and password**:
```
max@test.com
12345
```

## Requirements

[Link to original requirements of task](https://github.com/maxfarseer/tz-webinars/tree/tz-2-react-redux-router-async)

### Common

- redux: dispatch -> action -> reducer -> store
- routes
- login / logout button
- show preloader while data is loading
- error handling

### Routes

| Path          | Description                                        |
| ------------- | -------------------------------------------------- |
| `/`           | Main page                                          |
| `/news`       | News page. API.                                    |
| `/profile`    | User profile page. Available only authorized. API. |
| `/login`      | Login page                                         |
| `/[notfound]` | Not found page                                     |


### News page

- fetch data from API
- news feed format: title + content
- print the number of news
- news is stored in the reducer

### Profile page

- authorized access
- fetch data from API by user id
- data is stored in the reducer
- social network icons
- move the link to the site to the top of the list
- handle the situation when the user is not found


### Login page

- fields validation
- block re-submitting form data
- redirect to profile page after authorization

