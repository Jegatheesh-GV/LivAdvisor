const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
    
	let healthCondition = 'High Cholesterol'
	let age = 40
	let height = 170
	let weight = 70
	const prompt = `Generate a nutrition plan for a ${healthCondition} patient who is ${age} years old, stands ${height} cm tall, and weighs ${weight} kg.
	The output must be in JSON format.`
	const response = await openai.createCompletion(
		{
		  model: "text-davinci-003",
		  prompt,
		  temperature: 2,
		  max_tokens: 3000,
		  top_p: 0.4,
		  frequency_penalty: 0,
		  presence_penalty: 0.6,	
		}
	  );

	const parsableJSONresponse = response.data.choices[0].text;
	console.log('Here you go == ', parsableJSONresponse)

};

runPrompt();
