function RandomNextInt(min, max){
	return min + 1 + Math.floor( Math.random() * max);
}

function IsCollisionRect(Pl, Pr, Pt, Pb, El, Er, Et, Eb){
	
	if(El < Pr && Eb > Pt
		&& Er > Pl && Et < Pb)
			return true;//crash
	else
		return false;//not
}