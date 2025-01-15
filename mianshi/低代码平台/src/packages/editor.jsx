import {defineComponent, computed} from 'vue'
import EditorBlock from './editorBlock.jsx'

export default defineComponent({
	props: {
		modelValue: {
			type: Object
		},
		setup(props) {
			const data = computed({
				get() {
					return props.modelValue
				},
				set(value) {
					props.$emit('update:modelValue', value)
				}
			})
			const containerStyles = computed(() => ({
				width: data.value.container.width + 'px',
				height: data.value.container.height + 'px'
			}))
			return () => {
				return <div class="editor">
					<div className="editor-left"></div>
					<div className="editor-top"></div>
					<div className="editor-right"></div>
					{/*产生滚动条*/}
					<div className="editor-container">
						{/*内容区*/}
						<div className="editor-container-canvas">
							<div className="editor-container-canvas__content" style={containerStyles.value}>
								{
									data.value.blocks.map(block => {
										return <EditorBlock block={block}></EditorBlock>
									})
								}
							</div>
						</div>
					</div>
				</div>
			}
		}
	}
})
