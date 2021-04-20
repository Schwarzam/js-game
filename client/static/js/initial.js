// Redireciona para outra template de html
function redirectPage(templateName){
			axios.get('http://localhost:3000/templates/' + templateName + '.html')
				.then(res =>{
					document.getElementById('render').innerHTML = res.data
				})
}


function startClient(){
	socket.emit('connection')
}

const StartInterval = setInterval(() => {
	try{
		if (myId === undefined){
			startClient()
		}
	}catch(e){
		Toastify({
		  text: "Trying to connect to server...",
		  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
		  className: "info",
		  duration: 3000,
		}).showToast();
	}
	if (myId !== undefined){
		clearInterval(StartInterval)
	}
}, 3000)
