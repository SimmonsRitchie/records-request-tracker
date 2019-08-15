import authReducer from '../../reducers/auth'

test('Should set uid for login', () => {
    const dummyUid = "12345x"
    const action = {
        type: 'LOGIN',
        uid: dummyUid
    }
    const state = authReducer(undefined, action)
    expect(state.uid).toBe(dummyUid)
});

test('Should clear uid for logout', () => {
    const currentState = {
        uid: "12345x"
    }
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer(currentState, action)
    expect(state).toEqual({})
});