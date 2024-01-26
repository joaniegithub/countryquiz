import * as React from 'react';

import { Box } from '@mui/material';
import { countryFlags } from 'data/flags';

const GameFlag = (props) => {
    const { country } = props;

    return (
        <Box
            component="img"
            src={countryFlags[country]}
            mt={1}
            sx={{
              height: "auto",
              width: "60%",
              boxShadow:
                  '0px 5px 22px rgba(0, 0, 0, 0.4), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.3)',
            //   maxHeight: { xs: 233, md: 167 },
            //   maxWidth: { xs: 350, md: 250 },
            }}
        />
    );
};

export default GameFlag;
