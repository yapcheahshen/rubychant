
const dict={};

const parseData = data=> {
	const out=[];
	lines=data.split(/\r?\n/);
	lines.forEach( line=>{
		if (!line)return;
		const sections=line.split("//");
		const words=sections[0].trim().split(/ +/);
		const translation=sections[1]||"";
		const lineout=[];
		
		words.forEach(item=>{
			let last=0;
			let chi="--";
			item.replace(/\{(.*?)\}/g,(m,m1,p)=>{
				let pli=item.substring(last,p);
				//if (pli=="p") debugger
				if (m1.length) {
					chi=m1;
					dict[pli]=chi;
				} else {
					chi=dict[pli]||chi;
				}

				lineout.push( {pli,chi});
				last= p+m.length;
			});
			chi="";
			pli=item.substring(last);
			chi=dict[pli]||chi;
			pli= "&nbsp;"+pli+"&nbsp;";
			lineout.push({pli,chi})
		})

		if (translation) lineout.push({translation});
		out.push(lineout);
	})
	return out;
}
const opentrans=()=>{
	const ele=event.target
	const attr=ele.attributes;
	if (attr.t) {
		if (attr.t.value==ele.innerHTML) {
			ele.innerHTML="…";	
		} else{
			ele.innerHTML=attr.t.value;
		}
	}
}

const renderParagraph =data=>{
	let out="";

	data.forEach( line=>{
		out+="<table class=paragraph onclick=opentrans()><tr>"
		line.forEach( unit=>{
			if (unit.translation){
				out+="<td class=trans  t='"+unit.translation+"'>…</td>";	
			} else {
				out+="<td class=word>"
				out+="<span class=pli>"+unit.pli+"</span><br/>"+unit.chi;
				out+="</td>";
			}
		})
		out+="</tr></table><div class=hr></div>";
	});
	return out;
}

const render=name=>{
	const parsed=parseData(eval(name));
	document.getElementById("main").innerHTML=renderParagraph(parsed);
}

const init=()=>{
	render("anekajati");//
}