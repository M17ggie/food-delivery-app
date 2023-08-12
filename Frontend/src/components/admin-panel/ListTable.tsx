import { IListColumn } from '@utils/interfaces/admin-panel/admin-panel.interface';
import { Table } from 'antd';

const ListTable = ({ data, columns }: { data: IListColumn[], columns: any }) => {
    return (
        <>
            <Table dataSource={data} columns={columns} />
        </>
    )
}

export default ListTable