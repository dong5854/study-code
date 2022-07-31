const images = [
	"0.jpg",
	"1.jpg",
	"2.jpg",
	"3.jpg",
	"4.jpg",
	"5.jpg",
	"6.jpg",
	"7.jpg",
];

const ImageNum = Math.floor(Math.random() * images.length);
const chosenImage = images[ImageNum];

switch (ImageNum) {
	case 0:
		document.body.style.color = "darkblue";
		break;
	case 5:
		document.body.style.color = "lightgoldenrodyellow";
		break;

	default:
		document.body.style.color = "whitesmoke";
}

const bgImage = document.createElement("img");
bgImage.id = "bg";
bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);
