// Redireciona para outra template de html


function redirectPage(templateName){
			axios.get('http://localhost:3000/templates/' + templateName + '.html')
				.then(res =>{
					document.getElementById('render').innerHTML = res.data
				})
}