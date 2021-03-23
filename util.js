module.exports = {
	random: function (x, y) {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	getRandomInRange: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}, //Функция выбора рандомного числа
	randomInteger: function (min, max) {
		var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round(rand);
		return rand;
	},
	str_rand: (num) => {
		let result = '';
		let words = '01234567890123456789qwertyuiopasdfghjklzxcvbnmQWERTY';
		let max_position = words.length - 1;

		for (let i = 0; i < num; ++i) {
			let position = Math.floor(Math.random() * max_position);
			result += words.substring(position, position + 1);
		}

		return result;
	},
	nols: function (num) {
		if (num < 10) return ('0' + num)
		if (num > 9) return (num)
	},
	getSecondsToTomorrow: () => {
		let now = new Date();
		let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		return tomorrow - now;
	},

getSecondsToTomorrow: () => {
let now = new Date();
let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
return tomorrow - now;
},
  number_format:function( number, decimals, dec_point, thousands_sep ) {
		var i, j, kw, kd, km;
		if( isNaN(decimals = Math.abs(decimals)) ){
			decimals = 0;
		}
		if( dec_point == undefined ){
			dec_point = " ";
		}
		if( thousands_sep == undefined ){
			thousands_sep = " ";
		}

		i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

		if( (j = i.length) > 3 ){
			j = j % 3;
		} else{
			j = 0;
		}

		km = (j ? i.substr(0, j) + thousands_sep : "");
		kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
		kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
		return km + kw + kd;
	},




	rewrite_numbers: function (num) {
		var n = num.toString();
		const regex = /(\d)\s+(?=\d)/g;
		const subst = `$1`;
		return n.replace(regex, subst);
},








  unixStampLeft:function(stamp) {
		let s = stamp % 60;
		stamp = ( stamp - s ) / 60;

		let m = stamp % 60;
		stamp = ( stamp - m ) / 60;

		let	h = ( stamp ) % 24;
		let	d = ( stamp - h ) / 24;

		let text = ``;

		if(d > 0) text += Math.floor(d) + " д. ";
		if(h > 0) text += Math.floor(h) + " ч. ";
		if(m > 0) text += Math.floor(m) + " мин. ";
		if(s > 0) text += Math.floor(s) + " с.";

		return text;
	},
	unixStampLeftMassiv:function(stamp) {
		let s = stamp % 60;
		stamp = ( stamp - s ) / 60;

		let m = stamp % 60;
		stamp = ( stamp - m ) / 60;

		let	h = ( stamp ) % 24;
		let	d = ( stamp - h ) / 24;

		return [(d > 0 ? Math.floor(d):0), (h > 0 ? Math.floor(h):0), (m > 0 ? Math.floor(m):0), (s > 0 ? Math.floor(s):0)];
	},
  RandomItem:function(a) {
		var sum = 0;

		for (var i = 0; i < Object.keys(a).length; i++) {
			sum += a[i].procent;
		}

		var rand = Math.floor(Math.random() * sum);
		var i = 0;
		for (var s = a[0].procent; s <= rand; s += a[i].procent) {
			i++;
		}
		return a[i];
	},
		time: () => {
		return parseInt(new Date().getTime()/1000)
	},
}
