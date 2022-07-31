const quotes = [
	{
		quote: "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.",
		author: "사무엘존슨",
	},
	{
		quote: "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다.",
		author: "엘버트 허버드",
	},
	{
		quote: "진정으로 웃으려면 고통을 참아야하며 , 나아가 고통을 즐길 줄 알아야 해.",
		author: "찰리 채플린",
	},
	{
		quote: "한번의 실패와 영원한 실패를 혼동하지 마라.",
		author: "F.스콧 핏제랄드",
	},
	{
		quote: "좋은 성과를 얻으려면 한 걸음 한 걸음이 힘차고 충실하지 않으면 안 된다.",
		author: "단테",
	},
	{
		quote: "마음만을 가지고 있어서는 안된다. 반드시 실천하여야 한다.",
		author: "이소룡",
	},
	{
		quote: "인생이란 학교에는 불행 이란 훌륭한 스승이 있다. 그 스승 때문에 우리는 더욱 단련되는 것이다.",
		author: "프리체",
	},
	{
		quote: "세상은 고통으로 가득하지만 그것을 극복하는 사람들로도 가득하다.",
		author: "헬렌켈러",
	},
	{
		quote: "도중에 포기하지 말라. 망설이지 말라. 최후의 성공을 거둘 때까지 밀고 나가자.",
		author: "헨리포드",
	},
	{
		quote: "네 자신의 불행을 생각하지 않게 되는 가장 좋은 방법은 일에 몰두하는 것이다.",
		author: "베토벤",
	},
	{
		quote: "이미끝나버린 일을 후회하기 보다는 하고 싶었던 일들을 하지못한 것을 후회하라.",
		author: "탈무드",
	},
];

const quote = document.querySelector("#quote div:first-child");
const author = document.querySelector("#quote div:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
