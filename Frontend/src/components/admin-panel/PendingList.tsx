import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/index";
import { getTableList } from "@api/adminApi";

const PendingList = ({ userType }: { userType: string }) => {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getTableList({ userType: userType, status: "pending" })).unwrap().then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div>{userType} PendingList</div>
    )
}

export default PendingList