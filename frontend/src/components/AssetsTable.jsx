// import React from 'react'
import {Table } from 'antd'
import {useCrypto} from '../context/crypto-context'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: {
      target: 'full-header',
    },
    // filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe',
    //   },
    //   {
    //     text: 'Jim',
    //     value: 'Jim',
    //   },
    //   {
    //     text: 'Submenu',
    //     value: 'Submenu',
    //     children: [
    //       {
    //         text: 'Green',
    //         value: 'Green',
    //       },
    //       {
    //         text: 'Black',
    //         value: 'Black',
    //       },
    //     ],
    //   },
    // ],
    // // specify the condition of filtering result
    // // here is that finding the name started with `value`
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $ ',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
    // filters: [
    //   {
    //     text: 'London',
    //     value: 'London',
    //   },
    //   {
    //     text: 'New York',
    //     value: 'New York',
    //   },
    // ],
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];



export default function AssetsTable() {
  const {assets} = useCrypto ()

  const data = assets.map ((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
  }))
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log('params', pagination, filters, sorter, extra);
  // };
  
  return (
    <div>
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          // onChange={onChange}
          showSorterTooltip={{
            target: 'sorter-icon',
          }}
  />
    </div>
  )
}
