import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import HttpIcon from '@mui/icons-material/Http';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export const SidebarData=[

    {
        title:"Home",
        icon:<HomeRoundedIcon/>,
        link:'/'
    },
    {
        title:"Link",
        icon:<HttpIcon/>,
        link:'/apiurl'
    },
    
    {
        title:"History",
        icon:<StorageIcon/>,
        link:'/history'
    },
    {
        title:"LoadTest",
        icon:<LocalShippingIcon/>,
        link:'/history'
    },
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:'/profile'
    }
    
]