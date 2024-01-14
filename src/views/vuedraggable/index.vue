<template>
  <div class="row">
    <div style="margin-bottom: 100px;padding: 40px">
      <div :key="index" v-for="(item, index) in mapList">
        <p>{{item.title}}</p>
        <draggable
            class="list-group"
            :list="item.list"
            :group="'art' + index"
            itemKey="id"
            @start="start"
            @end="end"
        >
          <template #item="{ element, index }">
            <div class="list-group-item" :data-prop="toStr({element, type: item.componentType})">{{ element.name }} --------- {{ index }}</div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
          class="list-group"
          :list="list1"
          group="people"
          @change="log"
          @end="(evt) => dragEnd(evt, '111')"
          itemKey="name"
          @start="(evt) => dragStart(evt, 'type1')"
      >
        <template #item="{ element, index }">
          <div class="list-group-item" :data-prop="toStr(element)">{{ element.name }} --------- {{ index }}</div>
        </template>
      </draggable>

    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
          class="list-group"
          :list="list2"
          group="people1"
          @change="log"
          itemKey="name"
          @start="(evt) => dragStart(evt, 'type2')"
          @end="(evt) => dragEnd(evt, 'type2')"
      >
        <template #item="{ element, index }">
          <div class="list-group-item" :data-prop="toStr(element)">{{ element.name }} ====== {{ index }}</div>
        </template>
      </draggable>
      <h3>Draggable 3333</h3>
      <draggable
          class="list-group"
          :list="list3"
          group="people1"
          @change="log"
          itemKey="name"
          @start="(evt) => dragStart(evt, 'type3')"
          @end="(evt) => dragEnd(evt, 'type3')"
      >
        <template #item="{ element, index }">
          <div class="list-group-item" :data-prop="toStr(element)">{{ element.name }} ====== {{ index }}</div>
        </template>
      </draggable>
    </div>
    <br>
    <br>
    <br>

    <div>
      {{list1}}
    </div>
    <br>
    <div>
      {{list2}}
    </div>
    <div>
      {{activeItem}}-{{activeType}}
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  name: "two-lists",
  display: "Two Lists",
  components: {
    draggable
  },
  data() {
    return {
      activeObj: {
        type: '',
        active: null
      },
      activeItem: {},
      activeType: '',
      mapList: [
        {
          componentType: 5,
          title: '标题1',
          list: [
            { name: "行1", id: 1, type: 1 },
            { name: "行2", id: 2 , type: 1},
            { name: "行3", id: 3, type: 1 },
            { name: "行4", id: 4, type: 1 }
          ]
        },
        {
          componentType: 6,
          title: '标题2',
          list: [
            { name: "行1", id: 1, type: 1 },
            { name: "行2", id: 2 , type: 1},
            { name: "行3", id: 3, type: 1 },
            { name: "行4", id: 4, type: 1 }
          ]
        }
      ],
      list1: [
        { name: "行5", id: 5, type: 2 },
        { name: "行6", id: 6, type: 2 },
        { name: "行7", id: 7, type: 2 }
      ],
      list2: [
        { name: "行5", id: 5, type: 2 },
        { name: "行6", id: 6, type: 2 },
        { name: "行7", id: 7, type: 2 }
      ],
      list3: [
        { name: "行11", id: 11, type: 3 },
        { name: "行12", id: 12, type: 3 },
        { name: "行13", id: 13, type: 3 }
      ]
    };
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      // window.console.log(evt, 'llllllll');
    },
    dragEnd(evt, ty) {
      console.log(ty)
      const r = evt.originalEvent.srcElement.dataset
      const endObj = JSON.parse(r.prop)
      console.log(endObj, this.activeItem,ty, this.activeType, '========')
      if(ty !== this.activeType) {
        const index = this.list2.findIndex(item => item.id === this.activeItem.id)
        if(index> -1) {
          this.list2.splice(index, 1)
        }
        this.list1.push(this.activeItem)
        console.log('不同列表')
      }
      // console.log(r, 'dragend')
    },
    dragStart(evt, ty) {
      const r = evt.originalEvent.srcElement.dataset
      this.activeItem = JSON.parse(r.prop)
      this.activeType = ty
      // console.log(r.dataset, 'dragStart')
      console.log(r, this.activeType, 'start')

    },
    toStr(o) {
      return JSON.stringify(o)
    },
    start(evt) {
      const r = evt.originalEvent.srcElement.dataset
      const prop = JSON.parse(r.prop)
      this.activeObj = {
        type: prop.type,
        active: prop.element
      }
    },
    end(evt) {
      const r = evt.originalEvent.srcElement.dataset
      const endObj = JSON.parse(r.prop)
      const { type: endType, active: endActive} = endObj
      const { type, active} = this.activeObj
      if(type) {
        if(type !== endType) {
          const item = this.mapList.find(it => it.componentType === type)
          const itemEnd = this.mapList.find(it => it.componentType === endType)
          const index = item.list.findIndex(it => it.id === active.id)
          const it = item.list.splice(index, 1)
          itemEnd.list.push(it[0])
        }
      }
    }
  }
};
</script>
