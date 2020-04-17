module.exports = {
  up: (queryInterface) => {
		return queryInterface.bulkDelete('Users', null, {})
			.then(() => {
				return queryInterface.bulkInsert('Users', [
					{
						firstName: "lima",
						lastName: "neto",
						email: "lima@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "heyde",
						lastName: "cavalcante",
						email: "heyde@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "ian",
						lastName: "ramos",
						email: "ian@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "weslei",
						lastName: "prudencio",
						email: "weslei@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "wilmerson",
						lastName: "da silva",
						email: "wilmerson@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "jefte",
						lastName: "santos",
						email: "jefte@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "cauby",
						lastName: "andrade",
						email: "cauby@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "helmer",
						lastName: "costa",
						email: "helmer@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "andre",
						lastName: "junior",
						email: "andre@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "hugo",
						lastName: "brilhante",
						email: "hugo@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "morais",
						lastName: "pinto",
						email: "morais@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "douglas",
						lastName: "frazao",
						email: "douglas@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "jourdan",
						lastName: "rodrigues",
						email: "jourdan@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "ainara",
						lastName: "dos santos",
						email: "ainara@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "eduarda",
						lastName: "da silva",
						email: "eduarda@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "roberto",
						lastName: "cruz",
						email: "roberto@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "paulo",
						lastName: "pinheiro",
						email: "paulo@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "pedro",
						lastName: "sampaio",
						email: "pedro@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "felipe",
						lastName: "pederneiras",
						email: "felipe@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "lucas",
						lastName: "sombra",
						email: "lucas@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "eduardo",
						lastName: "da silva",
						email: "eduardo@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "jose",
						lastName: "sobral",
						email: "jose@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "silas",
						lastName: "pedreira",
						email: "silas@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "moacir",
						lastName: "junior",
						email: "moacir@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						firstName: "joarez",
						lastName: "neto",
						email: "joarez@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
				], {});
			});
  },

  down: (queryInterface) => {
		return queryInterface.bulkDelete('Users', null, {});
  }
};
