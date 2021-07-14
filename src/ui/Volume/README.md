# Volume

## Props

| Name     | Type                                                                           | Default   |
| -------- | ------------------------------------------------------------------------------ | --------- |
| volume   | number                                                                         | 100       |
| muted    | boolean                                                                        | false     |
| onMute   | ()=>void                                                                       | undefined |
| onVolume | (\_e: ChangeEvent<Record<string, unknown>>,newValue: number \| number[])=>void | undefined |
