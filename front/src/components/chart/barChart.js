import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],

  watch: {
    chartOptions() {
      console.log('watch - here?')
      this.renderChart(this.chartData, this.options)
    }
  },

  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    console.log('mounted - here?')
    this.renderChart(this.chartData, this.options)
  }
}
