const p = document.getElementById("txt")
let article = ""
let headersArray = []
//todo: try and see if you can use the history api to let you go back to previous pages

async function changeArticle(docName){ //thank you stack overflow for letting me skid this code
const text = await fetch(`/articles/${docName}.txt`)
.then(response => response.text())
.then(text => {
  // Do something with the text content
  article = text
applyArticle(text)
})
.catch(error => {
  // Handle errors
  console.error('Error fetching file:', error);
});

}

function applyArticle(text){ //this func applies text w markup
  text = text.replaceAll("\n","<br>")
//const links = text.match(/\[.*\|.*\]/g)
const links = text.match(/\[.+?\]/g) // /\[.*\|.*\]/g <- this is the one i was trying to use beforehand, thank you Owen Stephens on Google Groups for the one i'm using that works now
//console.log(links)
for(const match in links){
  const split = links[match].split("|")
  //console.log(match)
  text = text.replaceAll(links[match],`<i class="link" onclick="changeArticle('${split[1].substring(0,split[1].length-1)}')">${split[0].substring(1)}</i>`)
}

text = text.replaceAll(/\=\=\=.+?\=\=\=/g,"penguin")



if(text.match(/\!PICREL\=\".*\"/)){ //articles should only have 1 picrel
  const picrel = text.match(/\!PICREL\=\".*\"/)[0].substring(9,text.match(/\!PICREL\=\".*\"/)[0].length - 1)
  document.getElementById("picrel").src = picrel
  text = text.replace(text.match(/\!PICREL\=\".*\"/g),"")
}

const headers = text.match(/\=\=.*\=\=/)
for(const header in headers){

}
if(text.match(/\!DESC\=.*/)){ //articles should only have 1 desc
  const desc = text.match(/\!DESC\=.*/)[0].substring(6,text.match(/\!DESC\=.*/)[0].length - 1)
  document.getElementById("desc").innerHTML = desc
  text = text.replace(text.match(/\!DESC\=.*/g),"")
}
//console.log(text)


p.innerHTML = text
}

changeArticle("markup")