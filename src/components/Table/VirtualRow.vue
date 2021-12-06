<script>
export default {
  name: "VirtualRow",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  render() {
    const { item, $style } = this;

    return (
      <div class={$style.item}>
        <span class={$style.field}>{item.macAddress}</span>
        <span class={$style.field}>{item.ip}</span>
        <span class={$style.field}>{item.firstname}</span>
        <span class={$style.field}>{item.lastname}</span>
        <a class={$style.field} href="mailto:${item.email}">
          {item.email}
        </a>
        <span class={$style.field}>{item.password}</span>
      </div>
    );
  },
};
</script>

<style module>
.item {
  width: 100%;
  position: absolute;
  height: 55px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 2fr repeat(3, 1.5fr) 3fr 2.5fr;
  align-items: center;
}

.field {
  padding: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>