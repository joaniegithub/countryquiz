import * as React from 'react';

import { Box } from '@mui/material';

const GameFlag = (props) => {
    const { country, border, sxOverrides } = props;

    return (
        <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/flagsAndGeo/${country}.svg`}
            sx={{
                height: 'auto',
                maxWidth: '60%',
                maxHeight: '15vh',
                //   border: border ? "2px solid #fff" : "none",
                //   boxShadow:
                //       '0px 5px 22px rgba(0, 0, 0, 0.4), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.3)',
                //   maxHeight: { xs: 233, md: 167 },
                //   maxWidth: { xs: 350, md: 250 },
                ...sxOverrides,
            }}
        />
    );
};

export default GameFlag;
