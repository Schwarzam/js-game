function submitLogin(){
	const username = document.getElementById('UserInput').value.trim();
	const password = document.getElementById('PasswordInput').value.trim();

	axios.post(`${IP}/api/auth/signin`, {username: username, password: password})
		.then(res => {
			console.log(res.data)
		}).catch(err => {
			console.log(err.message)
		})
}


function submitLogin(){
	const username = document.getElementById('UserInput').value.trim();
	const password = document.getElementById('PasswordInput').value.trim();

	axios.post(`${IP}/api/auth/signin`, {username: username, password: password})
		.then(res => {
			console.log(res.data)

			if (res.data.id){
				Toastify({
				  text: "Hello!",
				  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
				  className: "info",
				}).showToast();
			}else{
				Toastify({
				  text: res.data.message,
				  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
				  className: "info",
				}).showToast();
			}

			
		}).catch(err => {
			Toastify({
			  text: err.message,
			  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
			  className: "info",
			}).showToast();
		})

}