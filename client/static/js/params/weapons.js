function get_weapon(gun){
	const weapons = {
		'scout': {
                  gunName: 'scout',
                  magazine: 10,
                  fire_rate: 1,
                  bullet_speed: 25,
                  reload_time: 3,
                  damage: 40,
                  url: '/imgs/weapons/scout.png'
		},
		'glock': {
                  gunName: 'glock',
                  magazine: 20,
                  fire_rate: 0.2,
                  bullet_speed: 20,
                  reload_time: 3,
                  damage: 16,
                  url: '/imgs/weapons/glock.png'
        }
	}

      return weapons[gun]
}