//处理包
const packageBodySize = 4   //包体长度
const packageCmd = 4        //协议号
const packageCustom = 4     //扩展字段
const Mask = 0x100

export class Package {
    private _data: any
    private _cmd: number

    constructor(data:any) {
        this._data = data
    }
    public WritePack(cmd: number): Uint8Array {
        let headSize = packageBodySize + packageCmd + packageCustom
        let dataArr = new TextEncoder().encode(this._data)
        length = dataArr.length
        let buff = this._getBuff(length)
        for (let i = 0; i < length; i++) {buff[headSize + i] = dataArr[i]}
        return buff
    }

    private _getBuff(size: number): Uint8Array {
        let headSize = packageBodySize + packageCmd + packageCustom
        let buff = new Uint8Array(headSize + size)
        buff[0] = size % Mask
        buff[1] = (size >> 8) % Mask
        buff[2] = (size >> 16) % Mask
        buff[3] = (size >> 24) % Mask
        buff[4] = this._cmd % Mask
        buff[5] = (this._cmd >> 8) % Mask
        buff[6] = (this._cmd >> 16) % Mask
        buff[7] = (this._cmd >> 24) % Mask
        return buff
    }

    public ReadPack() : void{}


    public static getPackage(data:any) : Package{
        return new Package(data)
    }

}