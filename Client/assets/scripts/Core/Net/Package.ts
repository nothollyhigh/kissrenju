//处理包
const packageBodySize = 4   //包体长度
const packageCmd = 4        //协议号
const packageCustom = 8     //扩展字段
const headSize = packageBodySize + packageCmd + packageCustom
const Mask = 0x100
const Gzip = 1 << 31
const CmdPing = 0x1 << 24

export class Package {
    private _data: any
    private _cmd: number

    constructor(data: any) { this._data = data }

    public WritePack(cmd: number): ArrayBuffer {
        this._cmd = cmd
        let dataArr = new TextEncoder().encode(this._data)
        length = dataArr.length
        let buf = this._getBuff(length)
        for (let i = 0; i < length; i++) { buf.setUint8(headSize + i, dataArr[i]) }
        return buf.buffer
    }

    private _getBuff(size: number): DataView {
        let buffer = new ArrayBuffer(headSize + size)
        let dv = new DataView(buffer)
        dv.setUint32(0, size, true)       //小端  数据长度
        dv.setUint32(4, this._cmd, true)  //小端 命令号
        return dv
    }

    public ReadPack(): void {
        let dv = new DataView(this._data)
        let length = dv.getUint32(0, true)
        let cmd = dv.getUint32(4, true)
        let body = this._data.slice(headSize)
        this._cmd = cmd
        // cocos 下使用pako  会造成性能降低. 数据量大 还会造成解压失败.所以放弃使用
        // if ((cmd & Gzip) == Gzip) {
        //     this._cmd = cmd & (~Gzip)
        //     // this._data = Pako.unzip(body)
        //     // this._data = pako.ungzip(body, { to: "string" })
        // } else { }
        if (this._cmd == CmdPing) { return }
        let data = new TextDecoder("utf-8").decode(this._data)
        if (length > 0 && body.byteLength > 16) { this._data = JSON.parse(data) }
    }

    public get cmdID(): number { return this._cmd }
    public get Data(): any { return this._data }

    public static getPackage(data: any): Package { return new Package(data) }

}