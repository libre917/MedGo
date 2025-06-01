import bcrypt from 'bcrypt';

const senhas = [
  "senha123", "senha123", "senha123", "senha123", "senha123",
  "senha123", "senha123", "senha123", "senha123", "senha123"
];

const saltRounds = 10;

const gerarHashes = async () => {
  for (let senha of senhas) {
    const hash = await bcrypt.hash(senha, saltRounds);
    console.log(`Senha original: ${senha} => Hash: ${hash}`);
  }
};

gerarHashes();