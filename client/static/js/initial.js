// Redireciona para outra template de html
function redirectPage(templateName){
			axios.get('http://localhost:3000/templates/' + templateName + '.html')
				.then(res =>{
					document.getElementById('render').innerHTML = res.data
				})
}

function submitLogin(){
	const username = document.getElementById('UserInput').value.trim();
	const password = document.getElementById('PasswordInput').value.trim();

	axios.post('http://192.168.0.107:3000/api/auth/signin', {
		headers: {
			"Content-Type": "application/json;"
		},
		data : {
			username : username,
			password : password
		}
	})
		.then(res => {
			console.log(res.data)
		})

}