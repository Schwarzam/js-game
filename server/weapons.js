module.exports = {
	weapons
}


function weapons(){
	return {
		'scout': {
			gunName: 'scout',
			magazine: 10,
			fire_rate: 1,
			bullet_speed: 25,
			reload_time: 3,
			damage: 30,
			url: '/imgs/weapons/scout.png'
		}
	}
}