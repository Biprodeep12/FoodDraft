import { BicepsFlexed, Box, Bubbles, Droplets, Leaf, Wheat, Zap } from "lucide-react"

export const IconNutri = (e:string,color:string)=>{
    switch(e) {
        case "energy-kcal":
            return <Zap color={color}/>
        case "fat":
            return <Droplets color={color}/>
        case "fiber":
            return <Leaf color={color}/>
        case "saturated-fat":
            return <Droplets color={color}/>
        case "sodium":
            return <Bubbles color={color}/>
        case "carbohydrates":
            return <Wheat color={color}/>
        case "proteins":
            return <BicepsFlexed color={color}/>
        case "sugars":
            return <Box color={color}/>
    }
}