import { getTableList } from "@api/adminApi";
import { Button } from "@material-ui/core";
import { AppDispatch } from "@store/index";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ListTable from "./ListTable";

const PendingList = ({ userType }: { userType: string }) => {

    let columns: any = [];
    switch (userType) {
        case "restaurant": columns = [
            { render: (_text: any, _record: any, index: number) => <span>{index + 1}</span>, title: "Sr. no" },
            { dataIndex: "restaurantName", title: "Restaurant Name" },
            { dataIndex: "restaurantEmail", title: "Email" },
            { dataIndex: "restaurantPhoneNumber", title: "Phone Number" },
            {
                title: "Action", render: (text: any) => (
                    <>
                        <Button onClick={() => { viewRestaurantHandler(text) }} variant="contained" color="default">
                            View
                        </Button>
                    </>
                )
            }
        ];
            break;
        default: columns = [];
    }

    const [data, setData] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getTableList({ userType: userType, status: "pending" })).unwrap().then(res => {
            setData(res)
        }).catch(err => console.log(err))
    }, []);

    const viewRestaurantHandler = (detail: any) => {
        console.log(detail)
    }

    return (
        <>
            <ListTable data={data} columns={columns} />
        </>
    )
}

export default PendingList