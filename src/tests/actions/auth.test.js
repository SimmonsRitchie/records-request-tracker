import { login, logout } from '../../actions/auth'

// When we test actions, we check to see whether the
// correct action object was generated.

test('Should generate login object', () => {
    const dummyUid = '343434fdgdhgddfg'
    const action = login(dummyUid)
    expect(action).toEqual({
        type: 'LOGIN',
        uid: dummyUid
    })
})

test('Should generate logout object', () => {
    const action = logout()
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})