import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Dialog,
  DialogPlugin,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Row,
  Space,
  Statistic,
  Table,
} from 'tdesign-react';
import moment from 'moment';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cbDataSourceState,
  cbInfo,
  cbInfoState,
  cbStart,
  startTimeState,
} from './states';
import { MinusIcon, PlusIcon } from 'tdesign-icons-react';
const { FormItem, useForm } = Form;

let timer;

export default function Clapperboard() {
  const setStart = useSetRecoilState(cbStart);
  return (
    <div
      style={{
        padding: '5%',
        display: 'flex',
        gap: 35,
        flexDirection: 'column',
      }}
    >
      <Timer />
      <Pannel />
      <ProjectTable />

      {/* <div>
        <Button onClick={() => setStart(true)}>启动</Button>
        <Button onClick={() => setStart(false)}>停止</Button>
      </div> */}
    </div>
  );
}

function Timer() {
  const [startTime, setStartTime] = useRecoilState<number>(startTimeState);
  const [nowTime, setNowTime] = useState<string>('');
  const start = useRecoilValue(cbStart);
  useEffect(() => {
    setInterval(() => {
      setNowTime(moment().format('HH:mm:ss.SS'));
    }, 50);
  }, []);
  useEffect(() => {
    let stTime = new Date().getTime();
    if (start) {
      timer = setInterval(() => {
        let time = new Date().getTime();
        setStartTime(time - stTime);
      });
    } else {
      clearInterval(timer);
    }
  }, [start]);

  return (
    <Row gutter={32}>
      <Col span={6}>
        <Card title="当前时间">
          <div className="timer" style={{ textAlign: 'center', height: 60 }}>
            {nowTime}
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="启动时间">
          <div className="timer" style={{ textAlign: 'center', height: 60 }}>
            {startTime === 0
              ? ''
              : moment(startTime - 8 * 3600 * 1000).format('HH:mm:ss.SS')}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

function Pannel() {
  const [form] = useForm(null);
  const [info, setInfo] = useRecoilState(cbInfoState);
  const [start, setStart] = useRecoilState(cbStart);
  const startTime = useRecoilValue(startTimeState);
  const setDataSource = useSetRecoilState(cbDataSourceState);
  const [endForm] = useForm(null);

  const DisplayInfo = (args: {
    /**展示数值 */
    value: number;
    /**项目名称 */
    title: string;
    /**项目id，用于变更数值 */
    id: cbInfo;
  }) => {
    let { value, title, id } = args;
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: 5,
          }}
        >
          <div>
            <input
              maxLength={5}
              onChange={(e) => {
                setInfo((prev) => {
                  return { ...prev, [id]: e.currentTarget.value };
                });
              }}
              value={value}
              className="pannel-text"
            />
            <span
              style={{
                fontWeight: 'normal',
                fontSize: '1.3rem',
                paddingLeft: 5,
              }}
            >
              {title}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              disabled={isNaN(value)}
              variant="text"
              icon={<PlusIcon />}
              onTouchStart={console.log}
              onClick={() =>
                setInfo((prev) => {
                  let value = prev[id];
                  return { ...prev, [id]: ++value };
                })
              }
            />
            <Button
              disabled={isNaN(value)}
              variant="text"
              icon={<MinusIcon />}
              onClick={() =>
                setInfo((prev) => {
                  let value = prev[id];
                  return { ...prev, [id]: --value };
                })
              }
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Form
        form={form}
        layout="inline"
        initialData={{
          name: '我永远喜欢爱莉希雅',
          director: 'Ar-Sr-Na',
        }}
      >
        <FormItem label="片名" name="name">
          <Input />
        </FormItem>
        <FormItem label="导演" name="director">
          <Input />
        </FormItem>
        <FormItem label="时间" name="time">
          <DatePicker />
        </FormItem>
      </Form>
      <Row>
        <Col span={3}>
          <DisplayInfo id="roll" value={info.roll} title="卷" />
        </Col>
        <Col span={3}>
          <DisplayInfo id="scene" value={info.scene} title="场" />
        </Col>
        <Col span={3}>
          <DisplayInfo id="shot" value={info.shot} title="镜" />
        </Col>
        <Col span={3}>
          <DisplayInfo id="times" value={info.times} title="次" />
        </Col>
      </Row>

      {start ? (
        <Button
          onClick={() => {
            setStart(false);
            let dialog = DialogPlugin.confirm({
              header: '结束设置',
              body: (
                <Form
                  form={endForm}
                  onSubmit={(e) => {
                    let { add } = e.fields;
                    if (add !== void '我永远喜欢爱莉希雅') {
                      setInfo((prev) => {
                        let newValue = prev[add];
                        return { ...prev, [add]: ++newValue };
                      });
                    }
                  }}
                >
                  <FormItem name="rate" label="评分">
                    <Rate />
                  </FormItem>
                  <FormItem name="add" label="自动增加">
                    <Radio.Group>
                      <Radio allowUncheck value="roll">
                        卷
                      </Radio>
                      <Radio allowUncheck value="scene">
                        场
                      </Radio>
                      <Radio allowUncheck value="shot">
                        镜
                      </Radio>
                      <Radio allowUncheck value="times">
                        次
                      </Radio>
                    </Radio.Group>
                  </FormItem>
                </Form>
              ),
              onCancel: () => {
                dialog.hide();
              },
              onConfirm: () => {
                dialog.hide();
                endForm.submit();
                let value = {
                  ...info,
                  ...form.getFieldsValue(true),
                  startTime,
                  rate: endForm.getFieldsValue(true).rate,
                };
                setDataSource((prev) => {
                  let newArr = [...prev];
                  newArr.push({ ...value, rowKey: Math.random() });
                  return newArr;
                });
                console.log(value);
              },
            });
          }}
        >
          结束
        </Button>
      ) : (
        <Button
          onClick={() => {
            setStart(true);
            let value = {
              ...info,
              ...form.getFieldsValue(true),
            };
            console.log(value);
          }}
        >
          开始
        </Button>
      )}
    </>
  );
}

function ProjectTable() {
  const dataSource = useRecoilValue(cbDataSourceState);
  return (
    <Table
      columns={[
        {
          colKey: 'info',
          title: '项目名称',
          cell: ({ row }) => <div>{row.name}</div>,
        },
        {
          colKey: 'roll',
          width: 30,
          title: '卷',
        },
        {
          colKey: 'scene',
          width: 30,
          title: '场',
        },
        {
          colKey: 'shot',
          width: 30,
          title: '镜',
        },
        {
          colKey: 'times',
          width: 30,
          title: '次',
        },
        {
          colKey: 'rate',
          width: 60,
          title: '评分',
        },
        {
          colKey: 'startTime',
          title: '持续时长',
          cell: ({ row }) => (
            <div>
              {moment(row.startTime - 8000 * 3600).format('HH:mm:ss.SS')}
            </div>
          ),
        },
      ]}
      data={dataSource}
    />
  );
}
