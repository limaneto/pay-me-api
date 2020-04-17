module.exports = {
  up: (queryInterface) => {
		return queryInterface.bulkDelete('Users', null, {})
			.then(() => {
				return queryInterface.bulkInsert('Users', [
					{
						id: "6dfaf9a7-83f4-4d25-bc06-7494d246b18f",
						firstName: "lima",
						lastName: "neto",
						email: "lima@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "d1abc2d7-e6b7-4fe0-ab90-67becec79415",
						firstName: "heyde",
						lastName: "cavalcante",
						email: "heyde@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "25a71ee9-2b6c-471c-88a2-db10dd963219",
						firstName: "ian",
						lastName: "ramos",
						email: "ian@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "49cc760c-fb38-4d6a-a889-e09c0abe359c",
						firstName: "weslei",
						lastName: "prudencio",
						email: "weslei@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "46103662-5d68-4f78-90d4-fad4de7c8afa",
						firstName: "wilmerson",
						lastName: "da silva",
						email: "wilmerson@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "327daf01-0e47-4d46-b8dd-6687f30494c1",
						firstName: "jefte",
						lastName: "santos",
						email: "jefte@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "3af5666b-0e12-4930-9ad4-16fda8276358",
						firstName: "cauby",
						lastName: "andrade",
						email: "cauby@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "5d1ea96d-1f5a-47ce-86e7-ce1e11481586",
						firstName: "helmer",
						lastName: "costa",
						email: "helmer@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "8423b749-e187-42ff-b4a5-ce121e38c503",
						firstName: "andre",
						lastName: "junior",
						email: "andre@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "756684c3-6480-48d2-bc4e-e0a5a1a995c6",
						firstName: "hugo",
						lastName: "brilhante",
						email: "hugo@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "92f106b2-915f-4529-b7f5-cc729e2eab9c",
						firstName: "morais",
						lastName: "pinto",
						email: "morais@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "1bdba4ff-c5ad-45e7-a637-5c003cbbb8af",
						firstName: "douglas",
						lastName: "frazao",
						email: "douglas@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "bca884d8-8764-4236-9102-febf722a4c6a",
						firstName: "jourdan",
						lastName: "rodrigues",
						email: "jourdan@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "83e4b509-e94c-4ca4-b118-0613a06d1e66",
						firstName: "ainara",
						lastName: "dos santos",
						email: "ainara@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "09ca59e5-32b9-463b-b15b-2b31722449b0",
						firstName: "eduarda",
						lastName: "da silva",
						email: "eduarda@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "3aa33ac8-2c59-481c-8617-723560bd63f3",
						firstName: "roberto",
						lastName: "cruz",
						email: "roberto@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "4103521f-c074-4e75-bccf-142c15a277f7",
						firstName: "paulo",
						lastName: "pinheiro",
						email: "paulo@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "19518110-27a8-49d0-867c-db79323d9cd0",
						firstName: "pedro",
						lastName: "sampaio",
						email: "pedro@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "6606e4ad-372f-4185-b79b-04c1142c65c4",
						firstName: "felipe",
						lastName: "pederneiras",
						email: "felipe@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "32cb2cfa-ee27-4668-867f-8ad7861533e3",
						firstName: "lucas",
						lastName: "sombra",
						email: "lucas@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "961abf25-2e87-4e7a-8097-aaa3a78f9e1e",
						firstName: "eduardo",
						lastName: "da silva",
						email: "eduardo@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "1802e2dc-1044-4a99-86ec-7bc072e07b5b",
						firstName: "jose",
						lastName: "sobral",
						email: "jose@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "038e7f3d-d65e-4917-8920-9caa108c9843",
						firstName: "silas",
						lastName: "pedreira",
						email: "silas@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "58927c47-3852-4b8c-af41-1701e4708fb2",
						firstName: "moacir",
						lastName: "junior",
						email: "moacir@gmail.com",
						password: "$2b$10$7FzoHZ38EvlIaDKTaRRmTulNgWPwiA2h/YHaYon20WrH4OklgTFl6",
						createdAt: "10/10/2010",
						updatedAt: "10/10/2010"
					},
					{
						id: "921ae531-a5d0-4a9e-872b-5e41bde04de1",
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
