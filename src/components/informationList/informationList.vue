<template>
  <div class="ListWrapper"
       v-show="showList">
    <Table border
           :columns="columns5"
           :data="data5"
           height="350"
           :loading="loading"></Table>
  </div>

</template>
<style >
.ListWrapper {
  position: absolute;
  top: 50%;
  bottom: 0;
  width: 70%;
  left: 15%;
}
</style>

<script>
export default {
  props: {
    loading: true,
    showList: false,
    datalist: {
      type: Array,
      defalut: []
    }
  },
  data () {
    return {
      columns5: [
        {
          title: 'Age',
          key: 'age',
          sortable: true,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name',
          align: 'center'
        },
        {
          title: 'Province',
          key: 'province',
          align: 'center'
          //   sortable: true
        },
        {
          title: 'Address',
          key: 'address',
          align: 'center'
        },
        {
          title: 'City',
          key: 'city',
          align: 'center'
        },
        {
          title: 'Zip',
          key: 'zip',
          align: 'center'
        }
      ],
      data5: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        }
      ]
    }
  }
}
</script>
