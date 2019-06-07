const User = require('../../src/model/user');

describe('SignUp', () => {
    it('Register user', async () => {
        const user = await User.create({
            nome: "Elder",
            senha: "123456",
            email: "elderteste@gmail.com",
            telefones: [{"ddd":"11", "number":"999999999"}],
            tokenAuth: "ABCDEFGHIJK134657894"
        });

        return expect(user.email).toBe("elderteste@gmail.com");
    });
});