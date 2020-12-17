import React from 'react';


class Title extends React.Component {

  /* Svg title, randomly generated in SetGame component to form valid or invalid set, depending on the situation on the table */
  
  render() {
    const {cArr, sArr} = this.props.ncData;
    const usePhrases = [];
    const colours = this.props.colours;
    const coords = [{x:'-3680', y: '3490'},
                    {x:'-2370', y: '2140'},
                    {x:'-2950', y: '3490'}]

    for(let i = 0; i < 3; i++){
      const xLink = '#letter' + i.toString();
      let fill;
      let stroke;

      if(sArr[i] === 0){
        fill = 'none';
        stroke = colours[cArr[i].toString()];
      }
      else if(sArr[i] === 1){
        fill = "url('#diagonal-stripes-t" + cArr[i].toString() + "')";
        stroke = 'none';
      }
      else {
        fill = colours[cArr[i].toString()];
        stroke = 'none';
      }
      usePhrases.push(
        <use key={i} x={coords[i].x} y={coords[i].y} xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} />
      )
    }

    return(
      <div className='title-wrapper'>
        <svg className='title-box' viewBox='0 0 420 80'>
          <defs>
            <path id='letter0' d='M4737 2842 l-57 -58 0 -114 0 -114 57 -58 57 -58 112 0 c127 0 137 -5 132 -67 l-3 -38 -63 -3 c-75 -4 -92 7 -92 54 l0 34 -100 0 -100 0 0 -73 0 -73 63 -62 63 -62 158 0 159 0 64 63 63 64 0 104 0 105 -63 62 -63 62 -106 0 c-120 0 -138 8 -138 64 0 46 16 56 86 56 68 0 74 -5 74 -66 l0 -35 103 3 102 3 3 69 3 69 -63 64 -62 63 -166 0 -166 0 -57 -58z'></path>
            <path id='letter1' d='M4204 4237 c-3 -8 -4 -47 -2 -88 3 -68 5 -74 26 -77 22 -3 22 -4 22 -203 l0 -199 -25 0 c-25 0 -25 -1 -25 -85 l0 -85 275 0 275 0 0 100 0 100 -85 0 c-69 0 -85 -3 -85 -15 0 -12 -14 -15 -65 -15 l-66 0 3 57 c2 34 8 58 16 61 6 2 12 -3 12 -12 0 -13 14 -16 85 -16 l85 0 0 115 0 115 -80 0 c-62 0 -82 -3 -86 -15 -4 -8 -12 -15 -20 -15 -10 0 -14 15 -14 55 l0 55 65 0 c37 0 65 -4 65 -10 0 -6 35 -10 85 -10 l85 0 0 100 0 100 -270 0 c-217 0 -272 -3 -276 -13z'></path>
            <path id='letter2' d='M5550 2795 l0 -105 85 0 c78 0 85 2 85 20 0 13 7 20 20 20 19 0 20 -7 20 -199 0 -190 -1 -199 -20 -204 -18 -5 -20 -14 -20 -91 l0 -87 148 3 147 3 0 85 c0 81 -1 85 -22 88 -23 3 -23 4 -23 203 0 188 1 199 19 199 10 0 21 -9 24 -20 5 -19 12 -21 89 -18 l83 3 0 100 0 100 -317 3 -318 2 0 -105z'></path>
            
            <pattern id='diagonal-stripes-t0' x='0' y='0' width ='24' height='24' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='12' height='24' stroke='none' fill={colours['0']} />
            </pattern>
            <pattern id='diagonal-stripes-t1' x='0' y='0' width ='24' height='24' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='12' height='24' stroke='none' fill={colours['1']} />
            </pattern>
            <pattern id='diagonal-stripes-t2' x='0' y='0' width ='24' height='24' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='12' height='24' stroke='none' fill={colours['2']} />
            </pattern>
          </defs>
          <g transform="translate(0.000000, 640.000000) scale(0.100000, -0.100000)">
            {usePhrases}
          </g>
        </svg>
      </div>
    );
  }
}

export default Title;