import _fetch from "pro/admin/cache/technical/technicalAccountOperate";

export default {
  name: "UvTechnicalShortList",

  props: {},

  data() {
    return {
      columns:[
        {
          props: "shortUrl",
          label: "短链",
          width: 300,
          dataType: "url"
        },
        {
          props: "url",
          label: "原地址",
          width: 400,
          dataType: "url"
        },
        {
          props: "gmtCreate",
          label: "创建时间",
          width: 200,
          dataType: "date"
        },
        {
          label: "操作",
          dataType: "action",
          list: [{ action: this.showDetails, txt: "详情" }]
        }
      ],
      tableData: [],
      pager: {
        total: 0,
        pageSize: 10,
        pageIndex: 1
      }
    };
  },

  computed: {},
  created() {
  },
  activated() {
    this.getUrls();
  },
  methods: {
    getColumns() {
      return this.columns;
    },
    getUrls() {
      const { pageSize, pageIndex } = this.pager;
      _fetch.getUrls(
        {
          pageSize,
          pageIndex
        },
        this.onGetUrls.bind(this)
      );
    },
    showDetails(row) {
      this.$emit('showDetails',row);
    },
    onGetUrls(data) {
      const {
        query: { totleCount },
        list
      } = data;
      this.pager.total = totleCount;
      this.tableData = list;
    },
    onPageChange(data) {
      this.pager.pageIndex = data;
      this.getUrls();
    }
  },
  render() {
    const { $data } = this;
    const { tableData, pager } = $data;

    const renderUrlColumn = (column, local) => {
      const { props, dataType, list } = column;
      const { row } = local;
      if (dataType === "url") {
        const url = props==='shortUrl'?`https://study.163.com/sl/${row[props]}`:row[props];
        return (
          <a target="_blank;" href={url}>
            <span>{url}</span>
            <i class="el-icon-view el-icon--right"></i>
          </a>
        );
      } else if (dataType === "date") {
        return <span>{new Date(row[props]).toLocaleString()}</span>;
      } else if (dataType === "action") {
        return list.map(ac => {
          return <a onClick={ac.action.bind(this,row)}>{ac.txt}</a>;
        });
      }
    };
    const columns = this.getColumns().map(column => {
      if (column.dataType) {
        return (
          <el-table-column
            label={`${column.label}`}
            width={column.width ? `${column.width}` : undefined}
            scopedSlots={{
              default: renderUrlColumn.bind(this, column)
            }}
          ></el-table-column>
        );
      } else {
        return (
          <el-table-column
            prop={`${column.props}`}
            label={`${column.label}`}
            width={column.width ? `${column.width}` : undefined}
          ></el-table-column>
        );
      }
    });
    return (
      <div>
        <el-table data={tableData} border style="width: 100%">
          {columns}
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          total={pager.total}
          on-current-change={this.onPageChange}
        ></el-pagination>
      </div>
    );
  }
};
