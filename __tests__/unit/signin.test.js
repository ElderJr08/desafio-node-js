const User = require('../../src/model/user');
const bcrypt = require('bcrypt');

describe('Authenticate user', () => {
    it('should authenticate user with email and password', async () => {
        const user = await User.create({
            nome: "Elder",
            senha: "123456",
            email: "elderteste3@gmail.com",
            telefones: [{"ddd":"11", "number":"999999999"}],
            tokenAuth: "0000000"
        });

        const { email, senha } = {
            email: "elderteste3@gmail.com",
            senha: "123456"
        }
        
        var lastLogin = new Date().getTime();
        var tokenAuth = "ABCDEFGH123456789"

        const user2 = await User.findOneAndUpdate({ email }, {$set: {data_criacao: lastLogin, tokenAuth: tokenAuth}}).select('+senha')
        if(!await bcrypt.compare(senha, user2.senha))
            return

        user2.tokenAuth = tokenAuth;
        
        return expect(user2.tokenAuth).toBe('ABCDEFGH123456789');
    });
});