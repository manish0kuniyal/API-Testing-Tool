import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import HttpIcon from '@mui/icons-material/Http';
import PersonIcon from '@mui/icons-material/Person';
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
        title:"Alerts",
        icon:<CampaignRoundedIcon/>,
        link:'/alerts'
    },
    {
        title:"Profile",
        icon:<PersonIcon/>,
        link:'/profile'
    }
    
]