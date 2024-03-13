import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Statistic,
} from 'tdesign-react';
import moment from 'moment';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cbInfo, cbInfoState, cbStart } from './states';
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
      <div>
        <Button onClick={() => setStart(true)}>启动</Button>
        <Button onClick={() => setStart(false)}>停止</Button>
      </div>
    </div>
  );
}

function Timer() {
  const [startTime, setStartTime] = useState<number>(0);
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
        setStartTime(time - stTime - 8 * 3600 * 1000);
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
            {moment(startTime).format('HH:mm:ss.SS')}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

function Pannel() {
  const [info, setInfo] = useRecoilState(cbInfoState);

  const DisplayInfo = (args: {
    /**展示数值 */
    value: string | number;
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
            alignItems: 'flex-end',
            gap: 5,
          }}
        >
          <span
            style={{
              fontSize: 70,
              fontWeight: 'bold',
              textAlign: 'right',
              width: 140,
            }}
          >
            {value}
            <span
              style={{
                fontWeight: 'normal',
                fontSize: '1.3rem',
                paddingLeft: 5,
              }}
            >
              {title}
            </span>
          </span>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              variant="text"
              icon={<PlusIcon />}
              onClick={() =>
                setInfo((prev) => {
                  let value = prev[id];
                  return { ...prev, [id]: ++value };
                })
              }
            />
            <Button
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
      <Form layout="inline">
        <FormItem label="片名">
          <Input />
        </FormItem>
        <FormItem label="导演">
          <Input />
        </FormItem>
        <FormItem label="时间">
          <Input />
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
    </>
  );
}
