const bcrypt = require('bcrypt');
const User = require('../../src/model/user');


describe('User', () => {
    it('should encrypt user password', async () => {
        const user = await User.create({
            nome: "Elder",
            senha: "123456",
            email: "elderteste2@gmail.com",
            telefones: [{"ddd":"11", "number":"999999999"}],
            tokenAuth: "ABCDEFGHIJK134657894"
        });

        return expect(await bcrypt.compare('123456', user.senha)).toBe(true);
    });
});