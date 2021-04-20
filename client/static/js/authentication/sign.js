//Valida o registro do usuário no servidor
function submitRegister(){
	const username = document.getElementById('LoginInput').value.trim();
	const email = document.getElementById('EmailInput').value.trim();
	const password = document.getElementById('PasswordInput').value.trim();
	const password1 = document.getElementById('ConfirmPass').value.trim();


	if(username.trim() === '' || password.trim() === '' || email.trim() === '' || password1.trim() === ''){
		Toastify({
		  text: "All fields are required",
		  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
		  className: "info",
		  duration: 3000,
		}).showToast();

	}else if (password !== password1){
		Toastify({
		  text: "Passwords do not match",
		  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
		  className: "info",
		  duration: 3000,
		}).showToast();

	}else{
		axios.post(`${IP}/api/auth/signup`, {username: username, email: email, password: password})
		.then(res => {
			if (res.data.message === "User was registered successfully!") {
				Toastify({
				  text: "User was registered successfully!",
				  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
				  className: "info",
				  duration: 3000,
				}).showToast();	

				redirectPage('authentication/auth')
			}else{

				Toastify({
					  text: res.data.message,
					  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
					  className: "info",
					  duration: 3000,
					}).showToast();
			}

		}).catch(err => {
			console.log(err.message)
		})
	}
}


//Valida o login do usuário no servidor
function submitLogin(){
	const username = document.getElementById('UserInput').value.trim();
	const password = document.getElementById('PasswordInput').value.trim();

	if(username.trim() === '' || password.trim() === ''){
		Toastify({
		  text: "All fields are required",
		  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
		  className: "info",
		  duration: 3000,
		}).showToast()
	}else{
		axios.post(`${IP}/api/auth/signin`, {username: username, password: password})
			.then(res => {

				if (res.data.id){
					Toastify({
					  text: "Hello!",
					  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
					  className: "info",
					  duration: 3000,
					}).showToast()

					localStorage.setItem("user", JSON.stringify(res.data))
					redirectPage('lobby')
				}else{
					Toastify({
					  text: res.data.message,
					  backgroundColor: "linear-gradient(to right, #fc4e2b, #ff2b00)",
					  className: "info",
					  duration: 3000,
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
	}