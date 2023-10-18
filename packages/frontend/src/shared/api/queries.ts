export const GET_USER_BY_ID = `
    query Query($userId: Int!) {
        user(id: $userId) {
            id
            email
        }
    }
`;