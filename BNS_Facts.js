var bnsFacts = [
    "Fun Fact: Brand New School has been around for 2 decades!",
    '"See problems as opportunities to be authentic and original"',
    '"To be original requires a new school of thought"',
    "Fun Fact: Brand New School has won over 70 awards!",
]


export function giveRandomFact(){
    return bnsFacts[Math.floor(Math.random()*bnsFacts.length)];
}