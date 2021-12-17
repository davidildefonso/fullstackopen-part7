import {useEffect, useState} from 'react'
import axios from 'axios'

export const useCountry = (lookUp) => {
	const [country, setCountry] = useState(null)
	useEffect(() => {
		fetchCountry(lookUp)
		
	}, [lookUp])

	const fetchCountry = async (lookUp) => {	
		try{
			if(!lookUp && lookUp.length === 0){
				setCountry(null)
				return
			} 
			const foundCountry = await  axios.get(`${url}/${lookUp}`)	
	
			if( foundCountry.data && foundCountry.data.length === 1)	{
				setCountry( {found: true, data: foundCountry.data[0]} )
				return
			}
			setCountry({found: false, data: null})
		}catch(e){
			setCountry({found: false, data: null})
		}		
	}


	return country
}

const url = "https://restcountries.com/v2/name"


