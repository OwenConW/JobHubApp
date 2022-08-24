export default function pitagorasDistance(coord1, coord2){
    let x1 = coord1[0];
    let y1 = coord1[1];

    let x2 = coord2[0];
    let y2 = coord2[1];

    let difx = x2 - x1;
    let dify = y2 - y1;

    let powx = Math.pow(difx, 2);
    let powy = Math.pow(dify, 2);

    return (Math.sqrt(powx+powy)*100);
}